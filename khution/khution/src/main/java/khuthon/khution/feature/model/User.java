package khuthon.khution.feature.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.Objects;

@Entity
@Table(name="user" )
@Data
@NoArgsConstructor
@ToString(callSuper = true)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id", nullable = false)
    private String user_id; // ID

    @Column(name = "user_password", nullable = false)
    private String user_password; // PW

    @Column(name = "user_name", nullable = false)
    private String user_name; // 이름

    @Column(name = "user_last_page", nullable = false)
    private String user_last_page; // 마지막 접속한 페이지

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return user_id != null && Objects.equals(user_id, user.user_id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public User(String user_id, String user_password, String user_name, String user_last_page) {
        this.user_id = user_id;
        this.user_password = user_password;
        this.user_name = user_name;
        this.user_last_page = user_last_page;
    }
}