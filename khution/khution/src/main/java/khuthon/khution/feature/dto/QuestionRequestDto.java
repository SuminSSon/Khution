package khuthon.khution.feature.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class QuestionRequestDto implements Serializable {
    private String message;
}
