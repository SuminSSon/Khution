    package khuthon.khution.feature.model;

    import jakarta.persistence.*;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;
    import lombok.ToString;
    import org.hibernate.Hibernate;

    import java.util.Objects;

    @Entity
    @Table(name="page")
    @Data
    @NoArgsConstructor
    @ToString(callSuper = true)
    @IdClass(PageId.class)
    public class Page {
        @Id
        //@GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "page_id", nullable = false)
        private String page_id; // 페이지 ID

        @Id
        @ManyToOne
        @JoinColumn(name = "user_id", referencedColumnName = "user_id")
        private User user_id; // 유저 ID FK, PK

        @Column(name = "page_title", nullable = false)
        private String page_title; // 페이지 제목

        @Column(name = "page_date", nullable = false)
        private String page_date; // 페이지 생성 날짜

        @Column(name = "page_depth", nullable = false)
        private String page_depth; // 페이지 폴더 깊이

        @Column(name = "page_parent", nullable = false)
        private String page_parent; // 페이지 상위 폴더

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
            Page page = (Page) o;
            return page_id != null && Objects.equals(page_id, page.page_id);
        }

        @Override
        public int hashCode() {
            return getClass().hashCode();
        }

        public Page(String page_id, User user_id, String page_title, String page_date, String page_depth, String page_parent) {
            this.page_id = page_id;
            this.user_id = user_id;
            this.page_title = page_title;
            this.page_date = page_date;
            this.page_depth = page_depth;
            this.page_parent = page_parent;
        }
    }
