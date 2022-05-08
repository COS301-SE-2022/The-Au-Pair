package Database.TheAuPair;

import Database.TheAuPair.Models.*;
import Database.TheAuPair.Repositories.*;
import Database.TheAuPair.controllers.UserController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TheAuPairApplication implements CommandLineRunner
{
	private final UserRepository ur;
	private final ParentRepository pr;
	private final Med_AidRepository ma;
	private final ChildRepository cr;
	private final ActivityRepository ar;
	private final Au_PairRepository apr;
	private final UserController uc;

	@Autowired
	public TheAuPairApplication(UserRepository ur, ParentRepository pr, Med_AidRepository ma, ChildRepository cr, ActivityRepository ar, Au_PairRepository apr)
	{
		this.ur = ur;
		this.pr = pr;
		this.ma = ma;
		this.cr = cr;
		this.ar = ar;
		this.apr = apr;
		uc = new UserController(ur);
	}

	public static void main(String[] args)
	{
		SpringApplication.run(TheAuPairApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception
	{
//		ur.save(new User("4561237814867","Reece","Stephenson","r.james.stephenson#gmail.com","1234567895","233 persheron road",true,1,"ello"));

		for (User u : ur.findAll())
		{
			System.out.println(u);
		}

		for (Parent p : pr.findAll())
		{
			System.out.println(p);
		}

		for (Med_Aid m : ma.findAll())
		{
			System.out.println(m);
		}

		for (Child c : cr.findAll())
		{
			System.out.println(c);
		}

		for (Activity a : ar.findAll())
		{
			System.out.println(a);
		}

		for (Au_Pair ap : apr.findAll())
		{
			System.out.println(ap);
		}

//		uc.get("Seyuran");

	}
}
