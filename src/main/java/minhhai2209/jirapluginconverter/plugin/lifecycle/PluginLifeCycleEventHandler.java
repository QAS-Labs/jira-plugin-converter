package minhhai2209.jirapluginconverter.plugin.lifecycle;

import com.atlassian.jira.util.json.JSONObject;
import com.atlassian.oauth.consumer.ConsumerService;
import com.atlassian.plugin.Plugin;
import com.atlassian.sal.api.ApplicationProperties;
import com.atlassian.sal.api.pluginsettings.PluginSettingsFactory;
import com.atlassian.sal.api.transaction.TransactionTemplate;
import com.atlassian.upm.api.license.PluginLicenseManager;
import minhhai2209.jirapluginconverter.plugin.jwt.JwtComposer;
import minhhai2209.jirapluginconverter.plugin.setting.*;
import minhhai2209.jirapluginconverter.plugin.utils.HttpClientFactory;
import minhhai2209.jirapluginconverter.utils.ExceptionUtils;
import minhhai2209.jirapluginconverter.utils.JsonUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;

public class PluginLifeCycleEventHandler {

  private PluginSettingsFactory pluginSettingsFactory;

  private TransactionTemplate transactionTemplate;

  private ApplicationProperties applicationProperties;

  private PluginLicenseManager pluginLicenseManager;

  private ConsumerService consumerService;

  private String jiraVersion;

  private String pluginVersion;

  public PluginLifeCycleEventHandler(
      PluginSettingsFactory pluginSettingsFactory,
      TransactionTemplate transactionTemplate,
      ApplicationProperties applicationProperties,
      PluginLicenseManager pluginLicenseManager,
      ConsumerService consumerService) {

    this.pluginSettingsFactory = pluginSettingsFactory;
    this.transactionTemplate = transactionTemplate;
    this.applicationProperties = applicationProperties;
    this.pluginLicenseManager = pluginLicenseManager;
    this.consumerService = consumerService;
  }

  public void onInstalled(StringBuilder error) throws Exception {

    Plugin plugin = PluginSetting.getJiraPlugin();

    JiraUtils.setApplicationProperties(applicationProperties);

    jiraVersion = applicationProperties.getVersion();
    PluginSetting.load(pluginSettingsFactory, transactionTemplate, pluginLicenseManager, consumerService);

    String existingSharedSecret = KeyUtils.getSharedSecret();
    if (existingSharedSecret == null) {
      KeyUtils.generateSharedSecret(pluginSettingsFactory, transactionTemplate);
    }
    String currentSharedSecret = KeyUtils.getSharedSecret();

    pluginVersion = plugin.getPluginInformation().getVersion();
    String uri = LifeCycleUtils.getInstalledUri();
    String jwt = (existingSharedSecret == null) ? null :
      JwtComposer.compose(KeyUtils.getClientKey(), existingSharedSecret, "POST", uri, null, null);

    notify(error, EventType.installed, uri, currentSharedSecret, jwt);
  }

  public void onEnabled() throws Exception {
    PluginSetting.load(pluginSettingsFactory, transactionTemplate, pluginLicenseManager, consumerService);

    String uri = LifeCycleUtils.getEnabledUri();
    String jwt = JwtComposer.compose(KeyUtils.getClientKey(), KeyUtils.getSharedSecret(), "POST", uri, null, null);
    notify(null, EventType.enabled, uri, null, jwt);
  }

  public void onDisabled() throws Exception {
    String uri = LifeCycleUtils.getDisabledUri();
    String jwt = JwtComposer.compose(KeyUtils.getClientKey(), KeyUtils.getSharedSecret(), "POST", uri, null, null);
    notify(null, EventType.disabled, uri, null, jwt);
  }

  public void onUninstalled() throws Exception {
    String uri = LifeCycleUtils.getUninstalledUri();
    String jwt = JwtComposer.compose(KeyUtils.getClientKey(), KeyUtils.getSharedSecret(), "POST", uri, null, null);
    notify(null, EventType.uninstalled, uri, null, jwt);
  }

  public void  onProjectAdminCredentialsSaved(StringBuilder error, ProjectAdministratorCredentials credentials) {
    try {
      String configuredPluginBaseUrl = PluginSetting.getPluginBaseUrl();

      if (configuredPluginBaseUrl != null && !configuredPluginBaseUrl.isEmpty()) {
        System.out.println(PluginSetting.getDescriptor().getKey() + " PLUGIN API USER: manifest");

        String uri = "/jira/server-7.x/accounts/settings";
        String url = configuredPluginBaseUrl + uri;
        HttpClient httpClient = HttpClientFactory.build();
        String jwt = JwtComposer.compose(KeyUtils.getClientKey(), KeyUtils.getSharedSecret(), "PUT", uri, null, null);
        String json = JsonUtils.toJson(credentials);
        HttpPut put = new HttpPut(url);

        put.setEntity(new StringEntity(json));
        put.addHeader(HttpHeaders.CONTENT_TYPE, "application/json");

        if (jwt != null) {
          put.addHeader("Authorization", "JWT " + jwt);
        }

        HttpResponse response = httpClient.execute(put);

        if (HttpStatus.SC_OK != response.getStatusLine().getStatusCode()) {
          HttpEntity entity = response.getEntity();

          if (entity != null) {
            String responseString = EntityUtils.toString(entity, "UTF-8");

            error.append(responseString);
          }
        }
      } else {
        System.out.println(PluginSetting.getDescriptor().getKey() + " PLUGIN API USER: suppressing notification. no plugin base url configured.");
      }
    } catch (Exception e) {
      System.out.println(PluginSetting.getDescriptor().getKey() + " PLUGIN API USER: FAILED: " + e.getMessage());
      if (error != null) {
        error.append(ExceptionUtils.getStackTrace(e));
      }
    }
  }

  private void notify(StringBuilder error, EventType eventType, String uri, String sharedSecret, String jwt) throws Exception {
    try {
      String configuredPluginBaseUrl = PluginSetting.getPluginBaseUrl();

      if (uri != null && configuredPluginBaseUrl != null && !configuredPluginBaseUrl.isEmpty()) {
        System.out.println(PluginSetting.getDescriptor().getKey() + " PLUGIN NOTIFY EVENT: " + "publishing install payload to: " + configuredPluginBaseUrl + uri);
        PluginLifeCycleEvent event = new PluginLifeCycleEvent();
        event.setBaseUrl(PluginSetting.getPluginJiraBaseUrl());
        event.setClientKey(KeyUtils.getClientKey());
        event.setDescription("");
        event.setEventType(eventType);
        event.setKey(PluginSetting.getDescriptor().getKey());
        event.setPluginsVersion(pluginVersion);
        event.setProductType(ProductType.jira);
        event.setPublicKey(KeyUtils.getPublicKey());
        event.setServerVersion(jiraVersion);
        event.setServiceEntitlementNumber(SenUtils.getSen());
        event.setSharedSecret(sharedSecret);
        notify(uri, event, jwt, error);
      } else {
        System.out.println(PluginSetting.getDescriptor().getKey() + " PLUGIN NOTIFY EVENT: suppressing notification. no plugin base url configured.");
      }
    } catch (Exception e) {
      System.out.println(PluginSetting.getDescriptor().getKey() + " PLUGIN NOTIFY EVENT '" +
        eventType.toString() + "' FAILED: " + e.getMessage());
      if (error != null) {
        error.append(ExceptionUtils.getStackTrace(e));
      }
    }
  }

  private void notify(String uri, PluginLifeCycleEvent event, String jwt, StringBuilder error) {
    try {
      String url = getUrl(uri);
      if (url != null) {
        HttpClient httpClient = HttpClientFactory.build();
        HttpPost post = new HttpPost(url);
        String json = JsonUtils.toJson(event);
        post.setEntity(new StringEntity(json));
        post.addHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        if (jwt != null) {
          post.addHeader("Authorization", "JWT " + jwt);
        }

        HttpResponse response = httpClient.execute(post);

        if (HttpStatus.SC_OK != response.getStatusLine().getStatusCode()) {
          HttpEntity entity = response.getEntity();
          if(entity != null) {
            String responseString = EntityUtils.toString(entity, "UTF-8");
            JSONObject result = new JSONObject(responseString);
            if (error != null) {
              error.append(result.getString("message"));
            }
          }
        }
      }
    } catch (Exception e) {
      ExceptionUtils.throwUnchecked(e);
    }
  }

  private static String getUrl(String uri) {
    String url;
    if (uri == null) {
      url = null;
    } else {
      String pluginBaseUrl = PluginSetting.getPluginBaseUrl();
      if (pluginBaseUrl == null) {
        url = null;
      } else {
        url = pluginBaseUrl + uri;
      }
    }
    return url;
  }
}
