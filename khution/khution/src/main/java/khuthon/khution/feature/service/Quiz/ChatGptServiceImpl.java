package khuthon.khution.feature.service.Quiz;

import khuthon.khution.feature.dto.ChatGptResponseDto;
import khuthon.khution.feature.model.Message;
import khuthon.khution.feature.dto.QuestionRequestDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChatGptServiceImpl implements ChatGptService {

    @Value("${chatGpt.key}")
    private String key;

    private String suffix = "위 내용을 바탕으로 객관식 문제 2개, 서술형 문제 2개, OX문제 2개를 만들어주고 답도 알려줘.\n" +
            "\n" +
            "Desired Format:\n" +
            "Q.\n" +
            "A.";

    @Override
    public String askQuestion(@RequestBody QuestionRequestDto questionRequestDto) {
        RestTemplate restTemplate = new RestTemplate();
        URI uri = UriComponentsBuilder
                .fromUriString("https://api.openai.com/v1/chat/completions")
                .build()
                .encode()
                .toUri();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + key);

        ArrayList<Message> list = new ArrayList<>();
        list.add(new Message("user", questionRequestDto.getMessage() + this.suffix));

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
