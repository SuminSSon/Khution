package khuthon.khution.feature.service.Page;


import khuthon.khution.feature.dto.PageDto;
import khuthon.khution.feature.model.Page;
import khuthon.khution.feature.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PageService {

    // 1. 유저 페이지 조회
    public List<Page> getPagesCreatedByUser(User userId);

    // 2. 새로운 페이지 등록
    public Page createPage(PageDto pageDto);

    // 3. 특정 페이지 컨텐츠 불러오기
    public Page getPageById(Integer pageId);

    // 4. 특정 페이지 컨텐츠 수정한 거 저장
    public Page updatePageContent(Integer pageId, Page updatedPage);

}
