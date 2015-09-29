package com.github.lzenczuk.engine.node.slot;

import com.github.lzenczuk.ps.engine.node.Node;
import com.github.lzenczuk.ps.engine.node.slots.slot.Slot;
import com.github.lzenczuk.ps.engine.node.slots.Slots;
import com.github.lzenczuk.ps.engine.node.slots.SlotsValidationResult;
import com.github.lzenczuk.ps.engine.script.phantomjs.PhantomJSScriptExecutor;
import org.junit.Test;

import java.io.IOException;
import java.util.Collections;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

/**
 * @author lzenczuk 29/09/2015
 */
public class SlotsTest {

    @Test
    public void shouldReturnNode() throws IOException {
        PhantomJSScriptExecutor scriptExecutor = null;

        try {

            String trueScript = "function main(input, ctx){" +
                    "return true" +
                    "}";

            String falseScript = "function main(input, ctx){" +
                    "return false" +
                    "}";

            scriptExecutor = new PhantomJSScriptExecutor();

            Node n1= (ctx, input, sem) -> null;
            Node n2= (ctx, input, sem) -> null;

            Slot s1 = new Slot(falseScript, n1);
            Slot s2 = new Slot(trueScript, n2);

            Slots slots = new Slots();
            slots.addSlot(s1);
            slots.addSlot(s2);

            SlotsValidationResult result = slots.getNextNode(Collections.emptyMap(), "", scriptExecutor);

            assertThat(result, is(notNullValue()));

            assertThat(result.isError(), is(false));
            assertThat(result.getNextNode(), is(equalTo(n2)));

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

            SlotsValidationResult result = slots.getNextNode(Collections.emptyMap(), "", scriptExecutor);

            assertThat(result, is(notNullValue()));

            assertThat(result.isError(), is(true));
            assertThat(result.getErrorMessage(), not(isEmptyOrNullString()));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }

    @Test
    public void noValidSlots() throws IOException {
        PhantomJSScriptExecutor scriptExecutor = null;

        try {

            String falseScript = "function main(input, ctx){" +
                    "return false" +
                    "}";

            scriptExecutor = new PhantomJSScriptExecutor();

            Node n1= (ctx, input, sem) -> null;
            Node n2= (ctx, input, sem) -> null;

            Slot s1 = new Slot(falseScript, n1);
            Slot s2 = new Slot(falseScript, n2);

            Slots slots = new Slots();
            slots.addSlot(s1);
            slots.addSlot(s2);

            SlotsValidationResult result = slots.getNextNode(Collections.emptyMap(), "", scriptExecutor);

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

            String errorScript = "function main(input, ctx){" +
                    "return poipoi" +
                    "}";

            scriptExecutor = new PhantomJSScriptExecutor();

            Node n1= (ctx, input, sem) -> null;
            Node n2= (ctx, input, sem) -> null;

            Slot s1 = new Slot(errorScript, n1);
            Slot s2 = new Slot(errorScript, n2);

            Slots slots = new Slots();
            slots.addSlot(s1);
            slots.addSlot(s2);

            SlotsValidationResult result = slots.getNextNode(Collections.emptyMap(), "", scriptExecutor);

            assertThat(result, is(notNullValue()));

            assertThat(result.isError(), is(true));
            assertThat(result.getErrorMessage(), not(isEmptyOrNullString()));

        }finally {
            if(scriptExecutor!=null) scriptExecutor.shutDown();
        }
    }
}
