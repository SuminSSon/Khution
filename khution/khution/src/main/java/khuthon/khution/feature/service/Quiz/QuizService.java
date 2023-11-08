package khuthon.khution.feature.service.Quiz;


import khuthon.khution.feature.model.Page;
import org.springframework.stereotype.Service;

@Service
public interface QuizService {

    // 1. 현재 페이지의 내용을 토대로 Quiz 생성
    public Page createQuiz(Page page);

    // 2. Quiz 정답 확인
    public Page getAnswer(Page page);

}
