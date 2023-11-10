package khuthon.khution.feature.service.Util;

import org.springframework.stereotype.Service;

@Service
public interface UtilService {

    // 1. spell check
    public String spellCheck(String page_contents);

    // 2. code ocr
    public String codeOcr(String ocr_code);
}
