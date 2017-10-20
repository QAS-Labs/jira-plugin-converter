FROM translucent/atlassian-plugin-sdk:jdk8-6.2.2

COPY ./pom.xml ./

RUN atlas-clean && atlas-package

COPY . ./

CMD ./start.sh
