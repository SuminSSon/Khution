package khuthon.khution.webapi;


import khuthon.khution.feature.service.Page.PageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PageController {

    @Autowired
    private final PageService pageService;


}
