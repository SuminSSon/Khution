package khuthon.khution.feature.service.Page;


import khuthon.khution.feature.model.Page;
import khuthon.khution.feature.model.User;
import org.springframework.stereotype.Service;

@Service
public interface PageService {

    // 1. 유저 페이지 조회
    public Page userPage(User user);

    // 2. 새로운 페이지 등록
    public Page newPage(Page page);

    // 3. 특정 페이지 컨텐츠 불러오기
    public Page getPageContents(Page page);

    // 4. 특정 페이지 컨텐츠 수정한 거 저장
    public Page updatePageContents(Page page);

}
