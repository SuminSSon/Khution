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
    private Integer quiz_id; // 퀴즈 ID

    @ManyToOne
    @JoinColumn(name = "page_Id", referencedColumnName = "page_id")
    private Page page_id; // 페이지 ID

    @Column(name = "quiz_question", nullable = false)
    private String quiz_question; // 퀴즈 문제

    @Column(name = "quiz_bool", nullable = false)
    private Boolean quiz_bool; // 퀴즈 정답 여부

    @Column(name = "quiz_answer", nullable = false)
    private String quiz_answer; // 퀴즈 해설

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Quiz quiz = (Quiz) o;
        return Objects.equals(quiz_id, quiz.quiz_id) && Objects.equals(page_id, quiz.page_id) && Objects.equals(quiz_question, quiz.quiz_question) && Objects.equals(quiz_bool, quiz.quiz_bool) && Objects.equals(quiz_answer, quiz.quiz_answer);
    }

    @Override
    public int hashCode() {
        return Objects.hash(quiz_id, page_id, quiz_question, quiz_bool, quiz_answer);
    }
}
