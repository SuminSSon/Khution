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
    private String page_content;
    private String page_title;
    private String page_depth;
    private String page_parent;

    // Dto -> Entity
    public Page toEntity() {
        Page page = Page.builder()
                .page_title(this.page_title)
                .user_id(this.user_id)
                .page_content(this.page_content)
                .page_depth(this.page_depth)
                .page_parent(this.page_parent)
                .build();

        return page;
    }

    // Entity -> Dto
    @Builder
    public PageDto(Integer page_id, User user_id, String page_content, String page_title, String page_depth, String page_parent) {
        this.page_id = page_id;
        this.user_id = user_id;
        this.page_content = page_content;
        this.page_title = page_title;
        this.page_depth = page_depth;
        this.page_parent = page_parent;
    }

    @Override
    public String toString() {
        return "PageDto{" +
                "page_id=" + page_id +
                ", user_id=" + user_id +
                ", page_content='" + page_content + '\'' +
                ", page_title='" + page_title + '\'' +
                ", page_depth='" + page_depth + '\'' +
                ", page_parent='" + page_parent + '\'' +
                '}';
    }
}
