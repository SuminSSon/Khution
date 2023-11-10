package khuthon.khution.webapi;

import khuthon.khution.feature.dto.PageDto;
import khuthon.khution.feature.model.Page;
import khuthon.khution.feature.repository.PageRepository;
import khuthon.khution.feature.service.Page.PageService;
import khuthon.khution.feature.service.Quiz.QuizService;
import lombok.RequiredArgsConstructor;
import org.hibernate.event.spi.SaveOrUpdateEvent;
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

    @GetMapping("/answer/{quizId}")
    public ResponseEntity<String> getQuizAnswer(@PathVariable Integer quizId) {
        String answer = quizService.getAnswer(quizId);
        if (answer != null) {
            return new ResponseEntity<>(answer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
