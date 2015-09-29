package com.github.lzenczuk.engine.node;

import com.github.lzenczuk.ps.engine.node.Node;
import com.github.lzenczuk.ps.engine.node.NodeExecutionResult;
import com.github.lzenczuk.ps.engine.node.ScriptNode;
import com.github.lzenczuk.ps.engine.node.slots.Slots;
import com.github.lzenczuk.ps.engine.node.slots.SlotsValidationResult;
import com.github.lzenczuk.ps.engine.script.ScriptExecutorManager;
import com.github.lzenczuk.ps.engine.script.phantomjs.PhantomJSScriptExecutor;
import org.junit.Test;

import java.io.IOException;
import java.util.Collections;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

import static org.mockito.Mockito.*;

/**
 * @author lzenczuk 29/09/2015
 */
public class ScriptNodeTest {

    @Test
    public void shouldExecuteScript() throws IOException {

        PhantomJSScriptExecutor scriptExecutor = null;

        try {

            String script = "function main(input, ctx){" +
                    "ctx.message = 'hello';" +
                    "return 'input: '+input" +
                    "}";

            scriptExecutor = new PhantomJSScriptExecutor();

            ScriptExecutorManager scriptExecutorManager = new ScriptExecutorManager();
            scriptExecutorManager.addExecutor("ph", scriptExecutor);

            Slots slotsMock = mock(Slots.class);
            Node nextNode = (ctx, input, sem) -> null;

            when(slotsMock.getNextNode(anyMap(), any(), any())).thenReturn(new SlotsValidationResult(nextNode));

            ScriptNode node = new ScriptNode(script, slotsMock, "ph");

            NodeExecutionResult result = node.execute(Collections.singletonMap("n", 4), "test", scriptExecutorManager);

            assertThat(result, is(notNullValue()));

            assertThat(result.getCtx(), is(notNullValue()));
            assertThat(result.getCtx().keySet().size(), is(2));
            assertThat(result.getCtx().get("n"), is(4L));
            assertThat(result.getCtx().get("message"), is(equalTo("hello")));

            assertThat(result.getOutPut(), is(equalTo("input: test")));

            assertThat(result.getNextNode(), is(equalTo(nextNode)));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void scriptContainingError() throws IOException {

        PhantomJSScriptExecutor scriptExecutor = null;

        try {

            String script = "function main(input, ctx){" +
                    "ctx.message = 'hello';" +
                    "return 'input: '+poipoi" +
                    "}";

            scriptExecutor = new PhantomJSScriptExecutor();

            ScriptExecutorManager scriptExecutorManager = new ScriptExecutorManager();
            scriptExecutorManager.addExecutor("ph", scriptExecutor);

            Slots slotsMock = mock(Slots.class);
            Node nextNode = (ctx, input, sem) -> null;

            when(slotsMock.getNextNode(anyMap(), any(), any())).thenReturn(new SlotsValidationResult(nextNode));

            ScriptNode node = new ScriptNode(script, slotsMock);

            NodeExecutionResult result = node.execute(Collections.singletonMap("n", 4), "test", scriptExecutorManager);

            assertThat(result, is(notNullValue()));
            assertThat(result.isError(), is(true));
            assertThat(result.getErrorMessage(), not(isEmptyOrNullString()));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void slotScriptContainingError() throws IOException {

        PhantomJSScriptExecutor scriptExecutor = null;

        try {

            String script = "function main(input, ctx){" +
                    "ctx.message = 'hello';" +
                    "return 'input: '+input" +
                    "}";

            scriptExecutor = new PhantomJSScriptExecutor();

            ScriptExecutorManager scriptExecutorManager = new ScriptExecutorManager();
            scriptExecutorManager.addExecutor("ph", scriptExecutor);

            Slots slotsMock = mock(Slots.class);

            when(slotsMock.getNextNode(anyMap(), any(), any())).thenReturn(new SlotsValidationResult("Error message"));

            ScriptNode node = new ScriptNode(script, slotsMock);

            NodeExecutionResult result = node.execute(Collections.singletonMap("n", 4), "test", scriptExecutorManager);

            assertThat(result, is(notNullValue()));
            assertThat(result.isError(), is(true));
            assertThat(result.getErrorMessage(), not(isEmptyOrNullString()));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }
}
