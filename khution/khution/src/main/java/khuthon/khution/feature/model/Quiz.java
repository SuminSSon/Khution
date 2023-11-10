package khuthon.khution.feature.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@Table(name="quiz")
@Data
@Builder
@NoArgsConstructor
@ToString(callSuper = true)
@AllArgsConstructor
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "quiz_id", nullable = true)
    private Integer quizId; // 퀴즈 ID

    @ManyToOne
    @JoinColumn(name = "page_Id", referencedColumnName = "page_id")
    private Page quizPageId; // 페이지 ID

    @Column(name = "quiz_question")
    private String quizQuestion; // 퀴즈 문제

    @Column(name = "quiz_bool")
    private Boolean quizBool; // 퀴즈 정답 여부

    @Column(name = "quiz_answer", length = 1000)
    private String quizAnswer; // 퀴즈 해설

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Quiz quiz = (Quiz) o;
        return Objects.equals(quizId, quiz.quizId) && Objects.equals(quizPageId, quiz.quizPageId) && Objects.equals(quizQuestion, quiz.quizQuestion) && Objects.equals(quizBool, quiz.quizBool) && Objects.equals(quizAnswer, quiz.quizAnswer);
    }

    @Override
    public int hashCode() {
        return Objects.hash(quizId, quizPageId, quizQuestion, quizBool, quizAnswer);
    }
}
