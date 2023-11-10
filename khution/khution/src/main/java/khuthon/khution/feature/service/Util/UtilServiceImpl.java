package khuthon.khution.feature.service.Util;

import khuthon.khution.feature.dto.ChatGptResponseDto;
import khuthon.khution.feature.model.Message;
import khuthon.khution.feature.service.Quiz.QuizServiceImpl;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Service
public class UtilServiceImpl implements UtilService {

    @Value("${chatGpt.key}")
    private String key;

    @Override
    public String spellCheck(String page_contents) {
        String gptQuery = page_contents + "\n위 문장의 맞춤법을 검사해서 고쳐줘.\ndesired format:\n<맞춤법이 고쳐진 문장>";
        RestTemplate restTemplate = new RestTemplate();
        URI uri = UriComponentsBuilder
                .fromUriString("https://api.openai.com/v1/chat/completions")
                .build()
                .encode()
                .toUri();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + key);

        ArrayList<Message> list = new ArrayList<>();
        list.add(new Message("user", gptQuery));

        Body body = new Body("gpt-3.5-turbo", list);

        RequestEntity<Body> httpEntity = new RequestEntity<>(body, httpHeaders, HttpMethod.POST, uri);

        ResponseEntity<ChatGptResponseDto> responseEntity = restTemplate.postForEntity(httpEntity.getUrl(), httpEntity, ChatGptResponseDto.class);

        return responseEntity.getBody().getChoices().get(0).getMessage().getContent();
    }

    @Override
    public String codeOcr(String ocr_code) {
        String gptQuery = ocr_code + "\n위 코드를 줄바꿈과 들여쓰기를 추가해 다시 생성해줘";
        RestTemplate restTemplate = new RestTemplate();
        URI uri = UriComponentsBuilder
                .fromUriString("https://api.openai.com/v1/chat/completions")
                .build()
                .encode()
                .toUri();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + key);

        ArrayList<Message> list = new ArrayList<>();
        list.add(new Message("user", gptQuery));

        Body body = new Body("gpt-3.5-turbo", list);

        RequestEntity<Body> httpEntity = new RequestEntity<>(body, httpHeaders, HttpMethod.POST, uri);

        ResponseEntity<ChatGptResponseDto> responseEntity = restTemplate.postForEntity(httpEntity.getUrl(), httpEntity, ChatGptResponseDto.class);

        return responseEntity.getBody().getChoices().get(0).getMessage().getContent();
    }

    @AllArgsConstructor
    @Getter
    @Setter
    static class Body {
        String model;
        List<Message> messages;
    }
}
