package khuthon.khution.webapi;


import khuthon.khution.feature.dto.UserDto;
import khuthon.khution.feature.model.User;
import khuthon.khution.feature.service.User.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    @Autowired
    private final UserService userService;

    // 1. 회원가입
    @PostMapping("/join")
    public ResponseEntity<Boolean> join(@RequestBody UserDto userDto) {
        boolean joined = userService.join(userDto);
        if (joined) {
            return ResponseEntity.ok(true); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false); // 400 Bad Request
        }
    }
    // 2. 로그인
    @GetMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody UserDto userDto) {
        boolean loggedIn = userService.login(userDto.getUser_id(), userDto.getUser_password());
        if (loggedIn) {
            return ResponseEntity.ok(true); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false); // 401 Unauthorized
        }
    }
    @GetMapping("/profile")
    public ResponseEntity<UserDto> userInfo(@RequestBody UserDto userDto) {
        String user_id = userDto.getUser_id();

        UserDto userProfile = userService.userProfile(user_id);

        if (userProfile != null) {
            return ResponseEntity.ok(userProfile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
