package khuthon.khution.webapi;

import khuthon.khution.feature.dto.QuestionRequestDto;
import khuthon.khution.feature.service.Quiz.ChatGptService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ChatGptController {

    private final ChatGptService chatGptService;

    @PostMapping("/quiz/create")
    public String quizCreate(@RequestBody QuestionRequestDto questionRequestDto) {
        return chatGptService.askQuestion(questionRequestDto).getChoices().get(0).getMessage().getContent();
    }
}
