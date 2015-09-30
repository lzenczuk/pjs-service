package com.github.lzenczuk.engine.node.slot;

import com.github.lzenczuk.ps.engine.node.slots.slot.ScriptSlot;
import com.github.lzenczuk.ps.engine.node.slots.slot.Slot;
import com.github.lzenczuk.ps.engine.node.slots.slot.SlotValidationResult;
import com.github.lzenczuk.ps.engine.script.phantomjs.PhantomJSScriptExecutor;
import org.junit.Test;

import java.io.IOException;
import java.util.Collections;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

/**
 * @author lzenczuk 29/09/2015
 */
public class SlotTest {

    @Test
    public void validParams() throws IOException {
        PhantomJSScriptExecutor scriptExecutor = null;

        try {

            String script = "function main(input, ctx){" +
                    "return input=='test' && ctx.n==4" +
                    "}";

            scriptExecutor = new PhantomJSScriptExecutor();

            Slot slot = new ScriptSlot(script, null);
            SlotValidationResult result = slot.validate(Collections.singletonMap("n", 4), "test", scriptExecutor);

            assertThat(result, is(notNullValue()));
            assertThat(result.isValid(), is(true));
            assertThat(result.isError(), is(false));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void invalidInput() throws IOException {
        PhantomJSScriptExecutor scriptExecutor = null;

        try {

            String script = "function main(input, ctx){" +
                    "return input=='testX' && ctx.n==4" +
                    "}";

            scriptExecutor = new PhantomJSScriptExecutor();

            Slot slot = new ScriptSlot(script, null);
            SlotValidationResult result = slot.validate(Collections.singletonMap("n", 4), "test", scriptExecutor);

            assertThat(result, is(notNullValue()));
            assertThat(result.isValid(), is(false));
            assertThat(result.isError(), is(false));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void invalidCtx() throws IOException {
        PhantomJSScriptExecutor scriptExecutor = null;

        try {

            String script = "function main(input, ctx){" +
                    "return input=='test' && ctx.n==5" +
                    "}";

            scriptExecutor = new PhantomJSScriptExecutor();

            Slot slot = new ScriptSlot(script, null);
            SlotValidationResult result = slot.validate(Collections.singletonMap("n", 4), "test", scriptExecutor);

            assertThat(result, is(notNullValue()));
            assertThat(result.isValid(), is(false));
            assertThat(result.isError(), is(false));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void notBooleanScriptResult() throws IOException {
        PhantomJSScriptExecutor scriptExecutor = null;

        try {

            String script = "function main(input, ctx){" +
                    "return 1" +
                    "}";

            scriptExecutor = new PhantomJSScriptExecutor();

            Slot slot = new ScriptSlot(script, null);
            SlotValidationResult result = slot.validate(Collections.singletonMap("n", 4), "test", scriptExecutor);

            assertThat(result, is(notNullValue()));
            assertThat(result.isValid(), is(false));
            assertThat(result.isError(), is(true));
            assertThat(result.getErrorMessage(), is(equalToIgnoringCase("Validation script return non boolean value")));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void validationScriptWithError() throws IOException {
        PhantomJSScriptExecutor scriptExecutor = null;

        try {

            String script = "function main(input, ctx){" +
                    "return 1abc" +
                    "}";

            scriptExecutor = new PhantomJSScriptExecutor();

            Slot slot = new ScriptSlot(script, null);
            SlotValidationResult result = slot.validate(Collections.singletonMap("n", 4), "test", scriptExecutor);

            assertThat(result, is(notNullValue()));
            assertThat(result.isValid(), is(false));
            assertThat(result.isError(), is(true));
            assertThat(result.getErrorMessage(), not(isEmptyOrNullString()));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

}
