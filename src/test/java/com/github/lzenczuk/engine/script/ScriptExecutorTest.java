package com.github.lzenczuk.engine.script;

import com.github.lzenczuk.ps.engine.script.nashorn.NashornScriptExecutor;
import com.github.lzenczuk.ps.engine.script.phantomjs.PhantomJSScriptExecutor;
import com.github.lzenczuk.ps.engine.script.ScriptExecutionResult;
import com.github.lzenczuk.ps.engine.script.ScriptExecutor;
import org.junit.Test;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

/**
 * @author lzenczuk 25/09/2015
 *
 * This test compares to JS engines
 *
 * Differences:
 * JS numbers return from engines: PhantomJS use long, Nashorn float
 * Immutable map as ctx: this will work with PHJS because it not try to modify original java map, NJS will throw exception.
 */
public class ScriptExecutorTest {

    @Test
    public void shouldExecuteScriptAndReturnOutput() throws IOException {

        String script = "function main(input, ctx){" +
                "return input+1" +
                "}";

        ScriptExecutor scriptExecutor=null;

        try {
            scriptExecutor = new PhantomJSScriptExecutor();

            ScriptExecutionResult result = scriptExecutor.executeScript(script, Collections.emptyMap(), 2);
            assertThat(result.getOutPut(), equalTo(3L));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }

        try {
            scriptExecutor = new NashornScriptExecutor();

            ScriptExecutionResult result = scriptExecutor.executeScript(script, Collections.emptyMap(), 2);
            assertThat(result.getOutPut(), equalTo(3.0));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void scriptShouldHaveAccessToContext() throws IOException {

        String script = "function main(input, ctx){" +
                "return input+ctx.n" +
                "}";

        ScriptExecutor scriptExecutor=null;

        try {
            scriptExecutor = new PhantomJSScriptExecutor();

            ScriptExecutionResult result = scriptExecutor.executeScript(script, Collections.singletonMap("n", 4), 2);
            assertThat(result.getOutPut(), equalTo(6L));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }

        try {
            scriptExecutor = new NashornScriptExecutor();

            ScriptExecutionResult result = scriptExecutor.executeScript(script, Collections.singletonMap("n", 4), 2);
            assertThat(result.getOutPut(), equalTo(6.0));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void shouldExecuteFunctionNotReturningValue() throws IOException {

        String script = "function main(input, ctx){" +
                "ctx.n=input;" +
                "}";

        ScriptExecutor scriptExecutor=null;

        try {
            scriptExecutor = new PhantomJSScriptExecutor();

            ScriptExecutionResult result = scriptExecutor.executeScript(script, Collections.singletonMap("n", 4), 2);
            assertThat(result.getCtx(), is(notNullValue()));
            assertThat(result.getCtx().size(), is(1));
            assertThat(result.getCtx().get("n"), equalTo(2L));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }

        try {
            scriptExecutor = new NashornScriptExecutor();

            ScriptExecutionResult result = scriptExecutor.executeScript(script, Collections.singletonMap("n", 4), 2);
            assertThat(result.getCtx(), is(notNullValue()));
            assertThat(result.getCtx().size(), is(1));
            assertThat(result.getCtx().get("n"), equalTo(2));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void scriptShouldBeAbleToUpdateContext() throws IOException {

        String script = "function main(input, ctx){" +
                "ctx.n=input;" +
                "}";

        ScriptExecutor scriptExecutor=null;

        try {
            scriptExecutor = new PhantomJSScriptExecutor();

            ScriptExecutionResult result = scriptExecutor.executeScript(script, Collections.singletonMap("n", 4), 2);
            assertThat(result.getCtx(), is(notNullValue()));
            assertThat(result.getCtx().size(), is(1));
            assertThat(result.getCtx().get("n"), equalTo(2L));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }

        try {
            scriptExecutor = new NashornScriptExecutor();

            ScriptExecutionResult result = scriptExecutor.executeScript(script, Collections.singletonMap("n", 4), 2);
            assertThat(result.getCtx(), is(notNullValue()));
            assertThat(result.getCtx().size(), is(1));
            assertThat(result.getCtx().get("n"), equalTo(2));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void scriptShouldNotUpdateOriginalContextMap() throws IOException {

        String script = "function main(input, ctx){" +
                "ctx.n=input;" +
                "}";

        ScriptExecutor scriptExecutor=null;

        try {
            scriptExecutor = new PhantomJSScriptExecutor();

            HashMap<String, Object> ctx = new HashMap<>();
            ctx.put("n", 4);

            scriptExecutor.executeScript(script, ctx, 2);
            assertThat(ctx.get("n"), equalTo(4));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }

        try {
            scriptExecutor = new NashornScriptExecutor();

            HashMap<String, Object> ctx = new HashMap<>();
            ctx.put("n", 4);

            scriptExecutor.executeScript(script, ctx, 2);
            assertThat(ctx.get("n"), equalTo(4));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void scriptWithError() throws IOException {

        String script = "function main(input, ctx){" +
                "ctx.n=poipoi;" +
                "}";

        ScriptExecutor scriptExecutor=null;

        try {
            scriptExecutor = new PhantomJSScriptExecutor();

            HashMap<String, Object> ctx = new HashMap<>();
            ctx.put("n", 4);

            ScriptExecutionResult result = scriptExecutor.executeScript(script, ctx, 2);

            assertThat(result, is(notNullValue()));
            assertThat(result.isError(), is(true));
            assertThat(result.getErrorMessage(), not(isEmptyOrNullString()));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }

        try {
            scriptExecutor = new NashornScriptExecutor();

            HashMap<String, Object> ctx = new HashMap<>();
            ctx.put("n", 4);

            ScriptExecutionResult result = scriptExecutor.executeScript(script, ctx, 2);

            assertThat(result, is(notNullValue()));
            assertThat(result.isError(), is(true));
            assertThat(result.getErrorMessage(), not(isEmptyOrNullString()));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void nullInput() throws IOException {

        String script = "function main(input, ctx){" +
                "return ctx.n+2" +
                "}";

        ScriptExecutor scriptExecutor=null;

        try {
            scriptExecutor = new PhantomJSScriptExecutor();

            ScriptExecutionResult result = scriptExecutor.executeScript(script, Collections.singletonMap("n", 4), null);
            assertThat(result.getOutPut(), equalTo(6L));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }

        try {
            scriptExecutor = new NashornScriptExecutor();

            ScriptExecutionResult result = scriptExecutor.executeScript(script, Collections.singletonMap("n", 4), null);
            assertThat(result.getOutPut(), equalTo(6.0));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void nullCtx() throws IOException {

        String script = "function main(input, ctx){" +
                "return input+2" +
                "}";

        ScriptExecutor scriptExecutor=null;

        try {
            scriptExecutor = new PhantomJSScriptExecutor();

            ScriptExecutionResult result = scriptExecutor.executeScript(script, null, 4);
            assertThat(result.getOutPut(), equalTo(6L));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }

        try {
            scriptExecutor = new NashornScriptExecutor();

            ScriptExecutionResult result = scriptExecutor.executeScript(script, null, 4);
            assertThat(result.getOutPut(), equalTo(6.0));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }
}
