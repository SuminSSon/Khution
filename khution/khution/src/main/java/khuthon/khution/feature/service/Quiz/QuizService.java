package khuthon.khution.feature.service.Quiz;


import khuthon.khution.feature.dto.PageDto;
import khuthon.khution.feature.model.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuizService {

    // 1. 현재 페이지의 내용을 토대로 Quiz 생성
    //public Boolean createQuiz(PageDto pageDto);
    public List<quizInfo> createQuiz(PageDto pageDto);

    // 2. Quiz 정답 확인
    public String getAnswer(Integer quiz_id, String user_answer);


}
