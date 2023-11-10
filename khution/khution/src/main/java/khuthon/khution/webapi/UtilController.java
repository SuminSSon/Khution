package khuthon.khution.webapi;

import khuthon.khution.feature.dto.OcrCodeDto;
import khuthon.khution.feature.dto.SpellCheckDto;
import khuthon.khution.feature.service.Util.UtilService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/util")
public class UtilController {

    private final UtilService utilService;

    // 1. spell check
    @PostMapping("/spellcheck")
    public String spellCheck(@RequestBody SpellCheckDto spellCheckDto) {
        return utilService.spellCheck(spellCheckDto.getPage_contents());
    }

    @PostMapping("/codeocr")
    public String codeOcr(@RequestBody OcrCodeDto ocrCodeDto) {
        return utilService.codeOcr(ocrCodeDto.getOcr_code());
    }

}
