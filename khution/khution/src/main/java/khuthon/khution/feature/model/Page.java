    package khuthon.khution.feature.model;

    import jakarta.persistence.*;
    import lombok.*;
    import org.hibernate.Hibernate;

    import java.util.Objects;

    @Entity
    @Table(name="page")
    @Data
    @Builder
    @NoArgsConstructor
    @ToString(callSuper = true)
    @AllArgsConstructor
    public class Page {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "page_id", nullable = true)
        private Integer pageId; // 페이지 ID

        @ManyToOne
        @JoinColumn(name = "user_id", referencedColumnName = "user_id")
        private User userId; // 유저 ID (FK)

        @Column(name = "page_title")
        private String pageTitle; // 페이지 제목

        @Column(name = "page_contents")
        private String pageContents; // 페이지 내용

        @Column(name = "page_depth", nullable = false)
        private Integer pageDepth; // 페이지 폴더 깊이

        @Column(name = "page_parent", nullable = false)
        private Integer pageParent; // 페이지 상위 폴더

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
            Page page = (Page) o;
            return pageId != null && Objects.equals(pageId, page.pageId);
        }

        @Override
        public int hashCode() {
            return getClass().hashCode();
        }
    }
