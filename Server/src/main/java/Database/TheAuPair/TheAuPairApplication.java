package Database.TheAuPair;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TheAuPairApplication implements CommandLineRunner
{
	@Autowired
	public TheAuPairApplication()
	{

	}

	public static void main(String[] args)
	{
		SpringApplication.run(TheAuPairApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception
	{

	}
}
