FROM gradle:7.5.1-jdk11-alpine

COPY . .

RUN gradle build

EXPOSE 8585

ENTRYPOINT ["java","-jar","build/libs/homeBanbing-0.0.1-SNAPSHOT.jar"]