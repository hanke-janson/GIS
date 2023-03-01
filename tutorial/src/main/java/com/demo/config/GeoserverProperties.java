package com.demo.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Configuration
@ConfigurationProperties(prefix = "geoserver")
public class GeoserverProperties {
    @Value("${geoserver.url}")
    private String url;
    @Value("${geoserver.username}")
    private String username;
    @Value("${geoserver.password}")
    private String password;
}
