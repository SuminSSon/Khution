package khuthon.khution.feature.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class SpellCheckDto implements Serializable {
    private String page_contents;
}
