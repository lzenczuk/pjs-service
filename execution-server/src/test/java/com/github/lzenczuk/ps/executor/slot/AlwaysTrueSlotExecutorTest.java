package com.github.lzenczuk.ps.executor.slot;

import com.github.lzenczuk.ps.engine.node.slots.slot.AlwaysTrueSlot;
import com.github.lzenczuk.ps.executor.result.SlotValidationResult;
import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

/**
 * @author lzenczuk 28/11/2015
 */
public class AlwaysTrueSlotExecutorTest {

    @Test
    public void shouldAlwaysReturnSuccessfulValidation(){
        final AlwaysTrueSlotExecutor alwaysTrueSlotExecutor = new AlwaysTrueSlotExecutor();

        final AlwaysTrueSlot slot = new AlwaysTrueSlot();
        slot.setDesNodeId(10L);

        final SlotValidationResult result = alwaysTrueSlotExecutor.validate(slot, null, null, null);

        assertThat(result, is(notNullValue()));
        assertThat(result.isValid(), is(true));
        assertThat(result.isError(), is(false));
        assertThat(result.getNextNodeId().isPresent(), is(true));
        assertThat(result.getNextNodeId().get(), is(10L));
    }
}
