package khuthon.khution.feature.service.Page;

import khuthon.khution.feature.dto.PageDto;
import khuthon.khution.feature.model.Page;
import khuthon.khution.feature.model.User;
import khuthon.khution.feature.repository.PageRepository;
import khuthon.khution.feature.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PageServiceImpl implements PageService{


    private final PageRepository pageRepository;
    private final UserRepository userRepository;


    @Override
    public List<Page> getPagesCreatedByUser(User userId) {
        return pageRepository.findByUserId(userId); // User_id에 해당하는 페이지 목록을 조회
    }

    @Override
    public Page createPage(PageDto pageDto) {
        User user = userRepository.findByUser_id(pageDto.getUser_id());

        Page page = pageDto.toEntity(user);
        return pageRepository.save(page);
    }

    @Override
    public Page getPageById(Integer pageId) {
        return pageRepository.findById(pageId).orElse(null);
    }

    @Override
    public Page updatePageContent(Integer pageId, Page updatedPage){
        Page existingPage = pageRepository.findById(pageId).orElse(null);
        if (existingPage != null) {
            existingPage.setPageContents(updatedPage.getPageContents());
            pageRepository.save(existingPage);
        }
        return existingPage;
    }
}
