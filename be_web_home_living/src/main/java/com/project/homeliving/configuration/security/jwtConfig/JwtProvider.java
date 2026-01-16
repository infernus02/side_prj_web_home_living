package com.project.homeliving.configuration.security.jwtConfig;

import com.project.homeliving.configuration.security.UserDetailsImpl;
import com.project.homeliving.entity.user.Account;
import com.project.homeliving.repository.user.IAccountRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {
    @Value("${jwt.SECRET_KEY}")
    private String JWT_SECRET;
    @Value("${jwt.JWT_EXPIRATION}")
    private int JWT_EXPIRATION;
    @Autowired
    IAccountRepository userRepository;

    public String generateToken(UserDetailsImpl customDetailService){
        return this.generateTokenByUsername(customDetailService.getUsername());
    }

    public String generateTokenByUsername(String username){
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        Account account = userRepository.findByUsername(username).get();
        return Jwts.builder()
                .setSubject(Long.toString(account.getId()))
                .claim("username", account.getUsername())
                .claim("role", account.getRole().getName())
                .setExpiration(expiryDate)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    public Long getUserIdFromJWT(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return Long.parseLong(claims.getSubject());
    }

    public String getKeyByValueFromJWT(String key, String token){
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return claims.get(key,String.class);
    }
}
