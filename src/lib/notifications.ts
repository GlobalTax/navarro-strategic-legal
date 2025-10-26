import { supabase } from "@/integrations/supabase/client";

interface CreateNotificationParams {
  userId: string | string[];
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category?: string;
  actionUrl?: string;
  entityType?: string;
  entityId?: string;
}

export const createNotification = async (params: CreateNotificationParams) => {
  const userIds = Array.isArray(params.userId) ? params.userId : [params.userId];
  
  const notifications = userIds.map(userId => ({
    user_id: userId,
    title: params.title,
    message: params.message,
    type: params.type,
    category: params.category,
    action_url: params.actionUrl,
    entity_type: params.entityType,
    entity_id: params.entityId,
  }));
  
  const { error } = await supabase
    .from('notifications')
    .insert(notifications);
    
  if (error) {
    console.error('Failed to create notification:', error);
  }
  
  return { error };
};
