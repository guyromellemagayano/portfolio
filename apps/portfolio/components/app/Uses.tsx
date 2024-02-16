'use client'

import { FC, useId } from 'react'

import ContentLayout from '@/components/layouts/Content'
import ToolsList from '@/components/list/Tools'
import ToolsListCards from '@/components/list/ToolsCards'

import type { TUsesData } from '@/data/uses'

import { isArrayType, isEmpty } from '@/utils/checkTypes'

import { TCommonComponentProps } from '@/types/common'

export type TUsesAppDataProps = {
  data: TUsesData
}

export type TUsesAppProps = TCommonComponentProps & TUsesAppDataProps

/**
 * Renders the uses page.
 * @param id The uses page id.
 * @param data The uses page data.
 * @param rest The uses page props.
 * @returns The uses page component.
 */
const UsesApp: FC<TUsesAppProps> = ({ id, data, ...rest }) => {
  const customId = useId()

  return (
    <ContentLayout
      id={id || customId}
      title={data?.hero?.heading || ''}
      intro={data?.hero?.description || []}
      {...rest}
    >
      <div className="space-y-20">
        {isArrayType(data?.tools) &&
          !isEmpty(data?.tools) &&
          data.tools.map((tool, index) => (
            <ToolsList key={index} title={tool?.name || ''}>
              {isArrayType(tool?.items) &&
                !isEmpty(tool?.items) &&
                tool.items.map((item, index2) => (
                  <ToolsListCards
                    key={index2}
                    title={item?.title || ''}
                    description={item?.title || ''}
                  />
                ))}
            </ToolsList>
          ))}
      </div>
    </ContentLayout>
  )
}

export default UsesApp
