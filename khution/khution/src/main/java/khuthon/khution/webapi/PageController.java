package khuthon.khution.webapi;


import khuthon.khution.feature.dto.PageDto;
import khuthon.khution.feature.model.Page;
import khuthon.khution.feature.model.User;
import khuthon.khution.feature.repository.UserRepository;
import khuthon.khution.feature.service.Page.PageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/page")
public class PageController {

    @Autowired
    private final PageService pageService;
    @Autowired
    private final UserRepository userRepository;

    @GetMapping("/userPages")
    public List<Page> getPagesCreatedByUser(@RequestParam String userId) {
        User user = userRepository.findByUser_id(userId);
        return pageService.getPagesCreatedByUser(user);
    }

    // 1. 페이지 생성
    @PostMapping("/create")
    public ResponseEntity<Page> createPage(@RequestBody PageDto pageDto) {
        Page createdPage = pageService.createPage(pageDto);
        return ResponseEntity.ok(createdPage);
    }

    // 2. 특정 페이지 컨텐츠 불러오기
    @GetMapping("/{page_id}")
    public ResponseEntity<Page> getPageContent(@PathVariable("page_id") Integer pageId) {
        Page page = pageService.getPageById(pageId);
        if (page != null) {
            return ResponseEntity.ok(page);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 3. 특정 페이지 컨텐츠 수정한거 저장
    @PostMapping("/{page_id}")
    public ResponseEntity<Page> updatePageContentWithPost(@PathVariable("page_id") Integer pageId, @RequestBody Page updatedPage) {
        Page page = pageService.updatePageContent(pageId, updatedPage);
        if (page != null) {
            return ResponseEntity.ok(page);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
