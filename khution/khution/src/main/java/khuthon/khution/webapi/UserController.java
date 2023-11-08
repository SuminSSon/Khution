package khuthon.khution.webapi;


import khuthon.khution.feature.model.User;
import khuthon.khution.feature.service.User.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;

    @PostMapping("join")
    public boolean join(@RequestBody User user) {
        return userService.join(user);
    }

    @GetMapping("info")
    public User userInfo(Model model, @RequestParam String id){
        User user = userService.userInfo(id);

        model.addAttribute("userInfo", user);
        return user;
    }
}
