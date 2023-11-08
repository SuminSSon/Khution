package khuthon.khution.feature.service.Page;

import khuthon.khution.feature.model.Page;
import khuthon.khution.feature.model.User;
import khuthon.khution.feature.repository.PageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PageServiceImpl implements PageService{

    @Autowired
    private final PageRepository pageRepository;

    public PageServiceImpl(PageRepository pageRepository) {
        this.pageRepository = pageRepository;
    }

    @Override
    public Page userPage(User user) {
        return null;
    }

    @Override
    public Page newPage(Page page) {
        return null;
    }

    @Override
    public Page getPageContents(Page page) {
        return null;
    }

    @Override
    public Page updatePageContents(Page page) {
        return null;
    }
}
