package khuthon.khution.feature.service.ChatGpt;

import khuthon.khution.feature.model.ChatGptResponseDto;
import khuthon.khution.feature.model.QuestionRequestDto;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public interface ChatGptService {

    public ChatGptResponseDto askQuestion(@RequestBody QuestionRequestDto questionRequestDto);
}
