package khuthon.khution.feature.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class OcrCodeDto implements Serializable {
    private String ocr_code;
}