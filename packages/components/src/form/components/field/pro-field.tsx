import type { SlotsType } from 'vue'
import type { ProFormItemProps } from '../form-item'
import type { ProFieldSlots } from './slots'
import { computed, defineComponent } from 'vue'
import { omitUndef } from '../../../_utils/omitUndef'
import { ProFormItem } from '../form-item'
import { createField } from './composables/createField'
import { useMergeOptions } from './composables/useMergeOptions'
import { useVModelProps } from './composables/useVModelProps'
import { fieldExtraKey } from './field-extra-info'
import { proFieldProps } from './props'

export default defineComponent({
  name: 'ProField',
  inheritAttrs: false,
  props: proFieldProps,
  slots: Object as SlotsType<ProFieldSlots>,
  setup(props, { attrs }) {
    const field = createField(props)

    const vModelProps = useVModelProps(
      props,
      { field },
    )

    const {
      mergedTitle,
      mergedReadonly,
      mergedShowLabel,
    } = useMergeOptions(props)

    const inputProps = computed(() => {
      const fieldProps = props.fieldProps ?? {}
      if (props.placeholder === undefined) {
        return {
          ...fieldProps,
          ...vModelProps.value,
        }
      }
      return {
        ...fieldProps,
        ...vModelProps.value,
        placeholder: props.placeholder,
      }
    })

    const proFormItemProps = computed<ProFormItemProps>(() => {
      const formItemProps: ProFormItemProps = {
        size: props.size,
        rule: props.rule,
        first: props.first,
        theme: props.theme,
        tooltip: props.tooltip,
        rulePath: props.rulePath,
        feedback: props.feedback,
        required: props.required,
        title: mergedTitle.value,
        labelWidth: props.labelWidth,
        labelAlign: props.labelAlign,
        labelProps: props.labelProps,
        labelStyle: props.labelStyle,
        path: field.stringPath.value,
        showLabel: mergedShowLabel.value,
        showFeedback: props.showFeedback,
        feedbackClass: props.feedbackClass,
        feedbackStyle: props.feedbackStyle,
        labelPlacement: props.labelPlacement,
        themeOverrides: props.themeOverrides,
        showRequireMark: props.showRequireMark,
        ignorePathChange: props.ignorePathChange,
        validationStatus: props.validationStatus,
        requireMarkPlacement: props.requireMarkPlacement,
        builtinThemeOverrides: props.builtinThemeOverrides,
      }
      return {
        ...attrs,
        ...omitUndef(formItemProps),
      }
    })

    field[fieldExtraKey] = {
      readonly: mergedReadonly,
    }

    return {
      inputProps,
      show: field.show,
      proFormItemProps,
    }
  },
  render() {
    if (!this.show) {
      return null
    }

    return (
      <ProFormItem {...this.proFormItemProps}>
        {{
          label: this.$slots.label,
          feedback: this.$slots.feedback,
          default: () => this.$slots.input(this.inputProps),
        }}
      </ProFormItem>
    )
  },
})
