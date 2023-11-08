package khuthon.khution.feature.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@Getter
public class ChatGptResponseDto {

    private String id;
    private String object;
    private LocalDate created;
    private String model;
    private List<Choice> choices;

    @Builder
    public ChatGptResponseDto(String id, String object,
                              LocalDate created, String model,
                              java.util.List<Choice> choices) {
        this.id = id;
        this.object = object;
        this.created = created;
        this.model = model;
        this.choices = choices;
    }
}
