package Database.TheAuPair.Services;

import org.bouncycastle.crypto.generators.Argon2BytesGenerator;
import org.bouncycastle.crypto.params.Argon2Parameters;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

public class SecurityService
{
  public String genPassword(String psw, byte [] salt)
  {
    Argon2Parameters.Builder builder = new Argon2Parameters.Builder(Argon2Parameters.ARGON2_id)
      .withVersion(Argon2Parameters.ARGON2_VERSION_13)
      .withIterations(4)
      .withMemoryAsKB(1048576)
      .withParallelism(1)
      .withSalt(salt);

    Argon2BytesGenerator gen = new Argon2BytesGenerator();
    gen.init(builder.build());

    byte [] result = new byte[32];
    gen.generateBytes(psw.getBytes(StandardCharsets.UTF_8), result, 0, result.length);

    String encoded = Base64.getEncoder().encodeToString(result);
    return encoded;
  }

  public byte [] genSalt()
  {
    SecureRandom SR = new SecureRandom();
    byte [] salt = new byte[16];
    SR.nextBytes(salt);
    return salt;
  }
}
