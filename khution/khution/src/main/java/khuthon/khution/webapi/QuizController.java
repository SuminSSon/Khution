package khuthon.khution.webapi;

import khuthon.khution.feature.dto.PageDto;
import khuthon.khution.feature.dto.QuizAnswerDto;
import khuthon.khution.feature.model.Page;
import khuthon.khution.feature.repository.PageRepository;
import khuthon.khution.feature.service.Page.PageService;
import khuthon.khution.feature.service.Quiz.QuizService;
import khuthon.khution.feature.service.Quiz.quizInfo;
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
    @GetMapping("/create")
    public List<quizInfo> createQuiz(@RequestParam Integer page_id) {
        Page page = pageService.getPageById(page_id);
        PageDto pageDto = new PageDto(page.getUserId(), page.getPageContents(), page.getPageTitle(), page.getPageDepth(), page.getPageParent());
        System.out.println("title" + pageDto.getPage_title());

        List<quizInfo> questions = quizService.createQuiz(pageDto);

        PageDto result = new PageDto(pageDto.getUser_id(), null, pageDto.getPage_title() + " Quiz", pageDto.getPage_depth() + 1, pageDto.getPage_id());
        pageService.createPage(result);

        return questions;

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
