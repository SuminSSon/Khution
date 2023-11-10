package khuthon.khution.webapi;

import khuthon.khution.feature.dto.PageDto;
import khuthon.khution.feature.dto.QuizAnswerDto;
import khuthon.khution.feature.model.Page;
import khuthon.khution.feature.repository.PageRepository;
import khuthon.khution.feature.service.Page.PageService;
import khuthon.khution.feature.service.Quiz.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/quiz")
public class QuizController {

    private final QuizService quizService;
    private final PageService pageService;
    private final PageRepository pageRepository;

    // 1. Quiz 생성
    @PostMapping("/create")
    public Page createQuiz(@RequestBody PageDto page) {
        System.out.println("title" + page.getPage_title());

        List<String> questions = quizService.createQuiz(page);

        PageDto result = new PageDto(page.getUser_id(), null, page.getPage_title() + " Quiz", page.getPage_depth() + 1, page.getPage_id());

        return pageService.createPage(result);

    }

    // 2. Quiz 정답 얻기
    @PostMapping("/answer")
    public ResponseEntity<String> getQuizAnswer(@RequestBody QuizAnswerDto quizAnswerDto) {
        System.out.println("DTO : " + quizAnswerDto.getQuiz_id() + quizAnswerDto.getUser_answer());
        String answer = quizService.getAnswer(quizAnswerDto.getQuiz_id(), quizAnswerDto.getUser_answer());
        if (answer != null) {
            return new ResponseEntity<>(answer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
