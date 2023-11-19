package khuthon.khution;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class KhutionApplication {

	@Configuration
	public class WebConfig implements WebMvcConfigurer {
		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/**")
					.allowedOrigins("http://localhost:8080", "http://localhost:3000") // 허용할 출처
					.allowedMethods("GET", "POST") // 허용할 HTTP method
					.allowCredentials(true) // 쿠키 인증 요청 허용
					.maxAge(3000); // 원하는 시간만큼 pre-flight 리퀘스트를 캐싱
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(KhutionApplication.class, args);
	}

}
