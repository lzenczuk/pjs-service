package com.github.lzenczuk.jjs;

import com.github.lzenczuk.ps.engine.ScriptExecutor;
import org.junit.Test;

import javax.script.*;
import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

/**
 * @author lzenczuk 23/09/2015
 */
public class ScriptEngineTest {

    @Test
    public void shouldExecuteScript() {
        String jsScript =
                "function main(input, ctx){" +
                "var name = ctx.name;" +
                "ctx.in = input;" +
                "ctx.name = ctx.name+'Test';" +
                "return input+12" +
                "}";

        Map<String, Object> ctx = new HashMap<>();
        ctx.put("name", "Mark");

        Object param = "Test1";

        ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");

        try {
            System.out.println("Ctx: "+ctx);

            engine.eval(jsScript);
            Invocable inv = (Invocable) engine;
            Object out = inv.invokeFunction("main", param, ctx);

            System.out.println("Out: "+out);
            System.out.println("Ctx: "+ctx);
        } catch (ScriptException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
    }
}
