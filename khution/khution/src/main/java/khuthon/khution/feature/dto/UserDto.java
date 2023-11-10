package khuthon.khution.feature.dto;

import khuthon.khution.feature.model.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDto {
    private String user_id;
    private String user_password;
    private String user_name;
    private String user_last_page;

    // Dto -> Entity
    public User toEntity() {
        User user = User.builder()
                .user_id(this.user_id)
                .user_password(this.user_password)
                .user_name(this.user_name)
//              .user_last_page(this.user_last_page)
                .build();

        return user;
    }

    // Entity -> Dto
    @Builder
    public UserDto(String user_id, String user_password, String user_name, String user_last_page) {
        this.user_id = user_id;
        this.user_password = user_password;
        this.user_name = user_name;
        this.user_last_page = user_last_page;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "user_id='" + user_id + '\'' +
                ", user_password='" + user_password + '\'' +
                ", user_name='" + user_name + '\'' +
                ", user_last_page='" + user_last_page + '\'' +
                '}';
    }
}
