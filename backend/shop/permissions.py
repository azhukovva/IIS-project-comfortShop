from rest_framework import permissions


class IsGroupUserOrReadOnly(permissions.BasePermission):
    group_name = None  

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.groups.filter(name=self.group_name).exists()

class IsAdminOrReadOnly(IsGroupUserOrReadOnly):
    group_name = "admin"

class IsModeratorOrReadOnly(IsGroupUserOrReadOnly):
    group_name = "moderator"
    

class IsAdminOrModerator(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name__in=['admin', 'moderator']).exists()    
    

class IsEnterepreneurOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in ["GET", "HEAD", "OPTIONS"]:  
            return True
        return request.user.groups.filter(name="interpreneur").exists()

    def has_object_permission(self, request, view, obj):
        return obj.entrepreneur == request.user 
    