package khuthon.khution.feature.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class QuizAnswerDto implements Serializable {
    private Integer quiz_id;
    private String user_answer;
}
