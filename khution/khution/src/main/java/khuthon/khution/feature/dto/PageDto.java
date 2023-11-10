package khuthon.khution.feature.dto;


import khuthon.khution.feature.model.Page;
import khuthon.khution.feature.model.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageDto {
    private Integer page_id;
    private User user_id;
    private String page_contents;
    private String page_title;
    private Integer page_depth;
    private Integer page_parent;

    // Dto -> Entity
    public Page toEntity() {
        Page page = Page.builder()
                .pageId(page_id)
                .pageTitle(this.page_title)
                .userId(user_id)
                .pageContents(this.page_contents)
                .pageDepth(this.page_depth)
                .pageParent(this.page_parent)
                .build();

        return page;
    }

    // Entity -> Dto
    @Builder
    public PageDto(User user_id, String page_contents, String page_title, Integer page_depth, Integer page_parent) {
        this.user_id = user_id;
        this.page_contents = page_contents;
        this.page_title = page_title;
        this.page_depth = page_depth;
        this.page_parent = page_parent;
    }

    @Override
    public String toString() {
        return "PageDto{" +
                ", user_id=" + user_id +
                ", page_content='" + page_contents + '\'' +
                ", page_title='" + page_title + '\'' +
                ", page_depth='" + page_depth + '\'' +
                ", page_parent='" + page_parent + '\'' +
                '}';
    }
}
