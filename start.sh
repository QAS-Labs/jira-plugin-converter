#!/bin/bash

PLUGIN_TAG=$CI_COMMIT_ID

echo "Buiding add-on ..."

java -cp target/generated_artifact_id-generated_artifact_version-jar-with-dependencies.jar \
    minhhai2209.jirapluginconverter.converter.Converter \
    com.invisionapp.integration.jira \
    $CONNENCT_JSON_URL ./build $PLUGIN_VERSION

echo "Packaging add-on ..."

cd ./build && atlas-package
