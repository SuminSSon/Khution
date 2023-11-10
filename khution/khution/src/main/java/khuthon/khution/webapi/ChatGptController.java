package khuthon.khution.webapi;

import khuthon.khution.feature.dto.QuestionRequestDto;
import khuthon.khution.feature.service.Quiz.ChatGptService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chatgpt")
public class ChatGptController {

    private final ChatGptService chatGptService;

    @PostMapping("/ask")
    public String quizCreate(@RequestBody QuestionRequestDto questionRequestDto) {
//        return chatGptService.askQuestion(questionRequestDto).getChoices().get(0).getMessage().getContent();
        return chatGptService.askQuestion(questionRequestDto);
    }
}
