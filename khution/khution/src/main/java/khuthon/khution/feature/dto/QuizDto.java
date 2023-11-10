package khuthon.khution.feature.dto;


import khuthon.khution.feature.model.Page;
import khuthon.khution.feature.model.Quiz;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuizDto {
    private Integer quiz_id;
    private Page page_id;
    private String quiz_question;
    private Boolean quiz_bool;
    private String quiz_answer;

    // Dto -> Entity
    public Quiz toEntity() {
        Quiz quiz = Quiz.builder()
                .quizId(this.quiz_id)
                .quizPageId(page_id)
                .quizQuestion(this.quiz_question)
                .quizBool(this.quiz_bool)
                .quizAnswer(this.quiz_answer)
                .build();

        return quiz;
    }

    // Entity -> Dto
    @Builder
    public QuizDto(Integer quiz_id, Page page_id, String quiz_question, Boolean quiz_bool, String quiz_answer) {
        this.quiz_id = quiz_id;
        this.page_id = page_id;
        this.quiz_question = quiz_question;
        this.quiz_bool = quiz_bool;
        this.quiz_answer = quiz_answer;
    }

    @Override
    public String toString() {
        return "QuizDto{" +
                "quiz_id=" + quiz_id +
                ", page_id=" + page_id +
                ", quiz_question='" + quiz_question + '\'' +
                ", quiz_bool=" + quiz_bool +
                ", quiz_answer='" + quiz_answer + '\'' +
                '}';
    }
}
