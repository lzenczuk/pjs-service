package com.github.lzenczuk.ps.executor;

import com.github.lzenczuk.ps.engine.node.slots.slot.ScriptSlot;
import com.github.lzenczuk.ps.engine.node.slots.slot.Slot;
import com.github.lzenczuk.ps.engine.node.slots.Slots;
import com.github.lzenczuk.ps.executor.SlotsExecutor;
import com.github.lzenczuk.ps.executor.result.SlotsValidationResult;
import com.github.lzenczuk.ps.executor.script.phantomjs.PhantomJSScriptExecutor;
import org.junit.Test;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

/**
 * @author lzenczuk 29/09/2015
 */
public class SlotsExecutorTest {

    @Test
    public void shouldReturnNode() throws IOException {
        PhantomJSScriptExecutor scriptExecutor = null;

        try {

            java.lang.String trueScript = "function main(input, ctx){" +
                    "return true" +
                    "}";

            java.lang.String falseScript = "function main(input, ctx){" +
                    "return false" +
                    "}";

            scriptExecutor = new PhantomJSScriptExecutor();

            Slot s1 = new ScriptSlot(falseScript, 1L);
            Slot s2 = new ScriptSlot(trueScript, 2L);

            Slots slots = new Slots();
            slots.addSlot(s1);
            slots.addSlot(s2);

            SlotsExecutor slotsExecutor = new SlotsExecutor();
            SlotsValidationResult result = slotsExecutor.getNextNode(slots, Collections.emptyMap(), "", scriptExecutor);

            assertThat(result, is(notNullValue()));

            assertThat(result.isError(), is(false));
            assertThat(result.getNextNodeId(), is(notNullValue()));
            assertThat(result.getNextNodeId().isPresent(), is(true));
            assertThat(result.getNextNodeId().get(), is(equalTo(2L)));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void noSlots() throws IOException {
        PhantomJSScriptExecutor scriptExecutor = null;

        try {

            scriptExecutor = new PhantomJSScriptExecutor();

            Slots slots = new Slots();

            SlotsExecutor slotsExecutor = new SlotsExecutor();
            SlotsValidationResult result = slotsExecutor.getNextNode(slots, Collections.emptyMap(), "", scriptExecutor);

            assertThat(result, is(notNullValue()));

            assertThat(result.isError(), is(false));
            assertThat(result.getNextNodeId(), is(Optional.empty()));
        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void noValidSlots() throws IOException {
        PhantomJSScriptExecutor scriptExecutor = null;

        try {

            java.lang.String falseScript = "function main(input, ctx){" +
                    "return false" +
                    "}";

            scriptExecutor = new PhantomJSScriptExecutor();

            Slot s1 = new ScriptSlot(falseScript, 1L);
            Slot s2 = new ScriptSlot(falseScript, 2L);

            Slots slots = new Slots();
            slots.addSlot(s1);
            slots.addSlot(s2);

            SlotsExecutor slotsExecutor = new SlotsExecutor();
            SlotsValidationResult result = slotsExecutor.getNextNode(slots, Collections.emptyMap(), "", scriptExecutor);

            assertThat(result, is(notNullValue()));

            assertThat(result.isError(), is(true));
            assertThat(result.getErrorMessage(), not(isEmptyOrNullString()));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void slotScriptError() throws IOException {
        PhantomJSScriptExecutor scriptExecutor = null;

        try {

            java.lang.String errorScript = "function main(input, ctx){" +
                    "return poipoi" +
                    "}";

            scriptExecutor = new PhantomJSScriptExecutor();

            Slot s1 = new ScriptSlot(errorScript, 1L);
            Slot s2 = new ScriptSlot(errorScript, 2L);

            Slots slots = new Slots();
            slots.addSlot(s1);
            slots.addSlot(s2);

            SlotsExecutor slotsExecutor = new SlotsExecutor();
            SlotsValidationResult result = slotsExecutor.getNextNode(slots, Collections.emptyMap(), "", scriptExecutor);

            assertThat(result, is(notNullValue()));

            assertThat(result.isError(), is(true));
            assertThat(result.getErrorMessage(), not(isEmptyOrNullString()));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }
}
